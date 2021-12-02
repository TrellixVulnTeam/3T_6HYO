const Music = require('../models/Music');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class MusicController {

    //Get /musics/:slug
    show(req, res, next) {
        Music.findOne({slug: req.params.slug})
            .then(musics =>{
                res.render('musics/show');
            })
            .catch(next);

    }

    //Get /music/create
   create(req, res,next){
       res.render("musics/create");
   }
   
   
    //POST /music/store
    store(req, res,next){
        const formData = {...req.body };
        formData.audio = req.file.path.slice(req.file.path.search("uploads")).split("\\").join("/")
        const music = new Music(formData);
        music.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }
}


module.exports = new MusicController;