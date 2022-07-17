const user = require('../schemas/user');
const post = require('../schemas/post');
const comment = require('../schemas/comment');


const createUser = async()=>{
    const newUser = new user({
        username: "Steve",
        name: "Steve Graham"
    })

    await newUser.save();
    console.log("Done")
}

// createUser();

const createPost = async()=>{
    // const newPost = new post({ 
    //     title: "Backend Engineer",
    //     body: "The InterviewReady Team has been searching for a backend engineer, Does someone know of a good one?",
    //     likes: 68,
    //     user: "62cef90dce85506bc8626607"
    // })

    // await newPost.save();
    // console.log("Done")
    const foundPost = await post.findById("62d3c2ec144e38d504939216");
    foundPost.likes=68;
    await foundPost.save();
    console.log("Done")

}


// createPost();


const createComment = async()=>{
   
//    const commentt = await new comment({
//     body: "Oh Havent you heard of Rajat Mohan? He's the best of the lot. his email is lkrajat22@gmail.com",
//     post:"62d3c2ec144e38d504939216",
//     user: "62d036a7d107136810f6fd8f"
    
//    }).save()
const foundCOmment = await user.findById("62d036a7d107136810f6fd8f");
foundCOmment.username = "binarytree_inverted"
await foundCOmment.save(); console.log("Done")

//    console.log("Done")

}

// createComment();