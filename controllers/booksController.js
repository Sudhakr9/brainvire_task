const Books = require('../models/books.model');


exports.Create = async (req,res)=>{
    const {bookName,genre,authorName,publishedDate,pageCount,description} = req.body;
    const newBooks ={bookName,genre,authorName,publishedDate,pageCount,description};
    console.log("**************************8",req.body);
    const findBooks= await Books.findOne({where:{bookName:bookName}})
    if(findBooks){
        res.status(400).send("book alredy existed")
    }else{
        Books.create(newBooks)
            .then((book)=>{
                res.status(200).send(book);
            })
            .catch(err=>{
                res.status(500).send(err)
            })
    }
}

exports.Update = async (req,res)=>{
    const id = req.params.id;
    const {bookName,genre,authorName,publishedDate,pageCount,description} = req.body;
    Books.findOne({where:{id:id}})
        .then((data)=>{
             if(!data) throw new Error("No Record Found")
             let values = req.body;
            const updateaBook =  data.update(values);
            res.status(200).send(updateaBook)
        })
         .catch((err=>{
             throw new Error(err)
        }))
};

exports.DeleteBooks = async (req,res)=>{
    const id = req.params.id;
    const book = await Books.destroy({where:{id:id}});
    res.status(200).send(`Book Deleted Successfully: ${id}`)
}