pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                echo 'building..'
                sh 'docker build -t auction/house .'
            }
        }stage ('test') {
            steps {
                sh 'node test.js'
            }
        }
    }
}