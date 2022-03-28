module.exports = {
  apps: [{
    name: 'vite2-vue3-ssr',
    script: 'server.js',
    env: {
      NODE_ENV: 'production'
    },
    // interpreter_args: '-r dotenv/config',
    exec_mode: 'cluster',
    instances: 'max',
    max_memory_restart: '2G',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    time: true,
    merge_logs: true
  }]
}
