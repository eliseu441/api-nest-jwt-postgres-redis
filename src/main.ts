import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'; 
import * as connectRedis from 'connect-redis'; 
import * as redis from 'redis'; 
import * as passport from 'passport'; 

const RedisStore = connectRedis(session); 
const url = process.env.REDIS_URL || 'redis://redis:6379';
const redisClient = redis.createClient({url}); 

passport.serializeUser(function(user, done) { 
  done(null, user); 
}); 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use( 
    session({ 
      secret: 'demo-session-secret', 
      resave: false, 
      saveUninitialized: false, 
      store: new RedisStore({ client: redisClient }),  
    }), 
  ); 
  app.use(passport.initialize()); 
  app.use(passport.session()); 


  await app.listen(3000);
}
bootstrap();
