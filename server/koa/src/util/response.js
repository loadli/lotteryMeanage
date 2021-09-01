export async function response(fn, data) {
    try {
        const res = await fn(data)
        return {
            code: '200',
            message: '成功',
            ...res
        }
    } catch (e) {
        console.log(e)
        return {
            code: '500',
            message: '内部错误',
            error: e.toString()
        }
    }

}