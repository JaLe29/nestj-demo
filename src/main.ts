import 'module-alias/register'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Listen on defined port
	await app.listen(4450, '0.0.0.0')
}
bootstrap()
