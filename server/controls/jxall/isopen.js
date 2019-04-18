// 获取开服查询
export default getIsOpen = async (ele) => {
  const { stdout, stderr } = await exec(ele);
  if (stderr) {
    console.error(`error: ${stderr}`);
    return 0
  } else {
    console.log(`Number of files ${stdout}`);
    return 1
  }
  
// let hosts = 'ping 121.14.64.155'
};