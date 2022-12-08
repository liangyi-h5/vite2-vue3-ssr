
export const getAssetsHomeFile = (file: string) => {
  const path = `../assets/image/${file}`
  const modules = import.meta.globEager('../assets/image/*')
  if (modules[path]) {
    return modules[path].default
  } else {
    console.warn('没有该资源')
    return ''
  }
}
