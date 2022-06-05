export const checkImage = (file) => {
	let err="";
	if(!file) return err="file not found"
	if(file.size > 1024*1024) return err="file size should be less than 1MB"
	if(file.type !== 'image/jpeg' && file.type !== 'image/png') return err='file not supported'
}