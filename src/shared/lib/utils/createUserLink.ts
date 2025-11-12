export const createUserLink = (email:string)=>{
  const userLink = email.split('@')[0]
  return userLink[0]?.toUpperCase() + userLink.slice(1)
}