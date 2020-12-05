const { find } = require('../model/Token');
const Token =require('../model/Token')
let token =[];

const getAllToken= async ()=>{
try {
    token=await Token.find();
    console.log(token);
} catch (error) {
    console.log(error);
}
    
}

const checkToken= (data)=>{
    
    const a=token.find(x => x._id == data.user_id && x.token==data.token);

    if(a){
        return true;
    }
    return false;
}

module.exports = {
  getAllToken,
  checkToken
};
