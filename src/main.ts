import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
    app.enableCors({
      origin: ['http://localhost:3979' , 'http://localhost:3000'], // Replace with your frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Allow credentials if needed
    });
    const port = process.env.PORT ?? 3001;
    console.log(`Application running on port ${port}`);
    await app.listen(port);
}
bootstrap();
