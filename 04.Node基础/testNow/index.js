const fs = require('fs');
const { basename } = require('path');
const path = require('path')
module.exports = class TestNow {
  /**
   * 测试代码生成
   * @param {*} sourcePath 
   */
  genJestSource(sourcePath = path.resolve('./')){
    const testPath = `${sourcePath}/__test__`
    if(!fs.existsSync(testPath)){
      fs.mkdirSync(testPath)
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath)
    list 
      // 添加完整路径
      .map(v=> `${sourcePath}/${v}`)
      // 过滤文件
      .filter(v => fs.statSync(v).inFile())
      // 排除测试代码
      .filter(v => v.indexOf('.spec') === -1 )
      .map(v => this.genTestFile(v))
  }

  /**
   * 测试文件生成
   * @param {*} filename 
   * @returns 
   */
  genTestFile(filename){
    console.log("filename",filename);
    const testFileName = this.getTestFileName(filename)

    // 判断文件是否存在
    if(fs.existsSync(testFileName)){
      console.log('该测试代码已存在',testFileName);
      return
    }

    const mod = require(filename)
    let source
    if(typeof mod === 'object'){
      source = Object.keys(mod)
        .map(v=>this.getTestSource(v,path.basename(filename),true))
        .join('\n')
    }else if(typeof mod === 'function'){
      const baseName = path.basename(filename)
      source = this.getTestFileName(basename.replace('.js',''),baseName)
    }
    fs.writeFileSync(testFileName,source)
  }

  /**
   * 测试代码生成
   * @param {String} methodName 
   * @param {String} classFile 
   * @param {Boolean} isClass 
   * @returns 
   */
  getTestSource(methodName, classFile, isClass = false) {
    console.log({ methodName, classFile, isClass });

    return `
test('${'TEST ' + methodName}'),()=>{
  const ${isClass ? '{' + methodName + '}' : methodName} = requir('${'../' + classFile}')
  const ret = ${methodName}()
  // expect(ret)
  //  .toBe('rest reture')
}
`
  }
  /**
   * 生成测试文件名
   * @param {*} filename 
   * @returns 
   */
  getTestFileName(filename) {
    console.log({ filename });
    const dirName = path.dirname(filename)
    const baseName = path.basename(filename)
    const extname = path.extname(filename)
    const testName = baseName.replace(extname, `.spec${extname}`)
    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }
}