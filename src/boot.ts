const boot = async () => {

  const { config } = await import('dotenv')
  config()

  const appEnv = process.env.ENV || 'dev'

  if (!['dev', 'prod'].includes(appEnv)) {
    console.error(`Unsupported env "${appEnv}"...`)
    process.exit(1)
  }

  console.log(`Starting app in ${appEnv} mode...`)

  if (appEnv === 'prod') {
    console.log('Injecting app-root-path module...')
    // @ts-ignore
    const appRothPath = await import('app-root-path')
    // @ts-ignore
    global.reqlib = appRothPath.require
  } else {
    console.log('Injecting module-alias/register module...')
    await import('module-alias/register')
  }

  return import('./main')
}

boot()
