pipeline {
  agent any

  environment {
    DEV_METADATA = '/var/lib/jenkins/workspace/inbuddy/dev'
  }

  tools {
    nodejs 'default'
  }

  stages {
    stage('React App 빌드') {
      steps {
        dir('client') {
          sh 'npm i && npm run build'
        }
      }
    }

    stage('Container 재시작') {
      steps {
        sh "docker compose -f ${env.DEV_METADATA}/docker-compose-dev.yml restart dev-fe"
      }
    }
  }
}
