
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-min-length': [2, 'always', 5], // 提交说明至少要5个字
    }
}