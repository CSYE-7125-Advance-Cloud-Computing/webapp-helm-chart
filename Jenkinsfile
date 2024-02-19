pipeline {
    agent any
    
    tools{
        nodejs 'nodejs'
    }

    environment {
        GITHUB_TOKEN = 'github-access-token'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Semantic Release') {
            steps {
                script {
                    withCredentials([string(credentialsId: GITHUB_TOKEN, variable: 'GH_TOKEN')]) {
                        env.GIT_LOCAL_BRANCH='main'
                        sh "npm i -g semantic-release"
                        sh "npm install -g semantic-release/git"
                        sh "npm install -g semantic-release/exec"
                        sh "semantic-release"
                    }
                }
            }                    
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
