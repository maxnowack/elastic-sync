#!/usr/bin/env node
import parseConfig from './parseConfig'
import ElasticSync from '.'

const start = async () => {
  const configFile = process.argv[2]

  if (!configFile) {
    console.log('Usage: elastic-sync <configFile>')
    process.exit(0)
  }

  const config = await parseConfig(configFile)
  config.sync.forEach((sync) => {
    const elasticSync = new ElasticSync(config, sync)
    elasticSync.initialize().catch((err) => {
      console.error(err)
      process.exit(1)
    })
  })
}

start().catch((err) => {
  console.error(err)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (err) console.log(JSON.stringify(err, null, 2))
  process.exit(1)
})
