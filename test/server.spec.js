const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const expectedFiles = require('./utils/expected-files');

const appBaseName = 'entandoPlugin';

describe('Subgenerator server of entando JHipster blueprint', () => {
  describe('With default blueprint configuration', () => {
    before(done => {
      helpers
        .run('generator-jhipster/generators/server')
        .withOptions({
          'from-cli': true,
          skipInstall: true,
          blueprint: 'entando',
          skipChecks: true,
        })
        .withGenerators([
          [
            require('../generators/server/index.js'), // eslint-disable-line global-require
            'jhipster-entando:server',
            path.join(__dirname, '../generators/server/index.js'),
          ],
        ])
        .withPrompts({
          baseName: appBaseName,
          packageName: 'com.mycompany.myapp',
          applicationType: 'microservice',
          databaseType: 'sql',
          devDatabaseType: 'h2Disk',
          prodDatabaseType: 'mysql',
          cacheProvider: 'ehcache',
          authenticationType: 'oauth2',
          enableTranslation: true,
          nativeLanguage: 'en',
          languages: ['fr', 'de'],
          buildTool: 'maven',
          rememberMeKey: '2bb60a80889aa6e6767e9ccd8714982681152aa5',
        })
        .on('end', done);
    });

    it('creates expected files for the blueprint', () => {
      assert.file(expectedFiles.server);
      assert.file(`bundle/plugins/${appBaseName.toLowerCase()}-plugin.yaml`);
    });

    it('pom.xml contains the javax servlet dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>javax.servlet</groupId>\n' +
          '            <artifactId>javax.servlet-api</artifactId>\n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the Undertow dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.springframework.boot</groupId>\n' +
          '            <artifactId>spring-boot-starter-undertow</artifactId>\n' +
          '<scope>provided</scope>\n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the Scala-library dependency', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>org.scala-lang</groupId>\n' +
          '            <artifactId>scala-library</artifactId>\n' +
          '            <version>2.12.1</version>\n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the mbknor-jackson-jsonschema dependecy', () => {
      assert.fileContent(
        'pom.xml',
        '        <dependency>\n' +
          '            <groupId>com.kjetland</groupId>\n' +
          '            <artifactId>mbknor-jackson-jsonschema_2.12</artifactId>\n' +
          '            <version>1.0.34</version>\n' +
          '\n' +
          '          <exclusions>\n' +
          '              <exclusion>\n' +
          '                  <groupId>org.scala-lang</groupId>\n' +
          '                  <artifactId>scala-library</artifactId>\n' +
          '              </exclusion>\n' +
          '          </exclusions>\n' +
          '          \n' +
          '        </dependency>\n',
      );
    });

    it('pom.xml contains the snapshot repository', () => {
      assert.fileContent(
        'pom.xml',
        '        <repository>\n' +
          '            <id>snapshot-repo</id>\n' +
          '            <url>https://oss.sonatype.org/content/repositories/snapshots</url>\n' +
          '        </repository>\n',
      );
    });
  });
});
