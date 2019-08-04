module.exports = (app) => {
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  const axios = require("axios");
  var url = require("url");
  var adr = "https://swapi.co/api/planets/";
  var q = url.parse(adr, true);
 
  const mongoose = require("mongoose");
  const Planeta = mongoose.model('Planet');


  // lista de filmes consumida da SWAPI
  app.get("/api/planets", (req, res) => {
    axios.get(adr).then(response => {
      res.status(200).json({
        data: response.data.results
      });
    }).catch(e => {
      res.status(400).send({
        message: "Planeta não encontrado!",
        data: e
      });
    });;
  });

  //busca pelo nome na SWAPI
  app.get('/api/planets/search/:nome', (req, res) => {
    var nome = req.params.nome.toLowerCase();

    axios({
      url: adr+'?search='+nome,
      method: 'get'    
  }).then((response) =>{
    res.status(200).json ({
      data: response.data.results
    });
  }).catch(e => {
    res.status(400).send({
      message: "Planeta não encontrado!",
      data: e
    });
  });;
  
});

  //busca na SWAPI por id
  app.get('/api/planets/:id', (req, res) => {
    var id = req.params.id;
    axios({
      url: adr + id,
      method: 'get'    
  }).then((response) =>{
    res.status(200).json ({
      data: response.data
    });
  }).catch(e => {
    res.status(400).send({
      message: "Planeta não encontrado!",
      data: e
    });
  });
});


// lista planetas do banco mongodb
app.get("/planets", (req, res) => {
  Planeta.find({}, 'nome clima terreno')
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send({
        message: "Planeta encontrado",
        data: e
      });
    });
}); 

//busca pelo nome no banco mongodb
app.get("/planets/search/:nome", (req, res) => {
  Planeta.findOne({  
    nome: req.params.nome
  }, 'nome clima terreno')
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send({
        message: "Planeta não encontrado!",
        data: e
      });
    });
}); 

//busca por id no banco mongodb
app.get("/planets/:id", (req, res) => {
  Planeta.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send({
        message: "Planeta não cadastrado!",
        data: e
      });
    });
}); 

  // adicionando planeta no banco mongodb
  app.post("/planets", (req, res) => {
    var planeta = new Planeta( 
      {
      nome: req.body.nome,
      clima: req.body.clima,
      terreno: req.body.terreno
    });


    if(req.body.nome == undefined || req.body.nome == null || req.body.nome == ''){
      res.json ({
        error: true,
        data: "Nome incorreto. por favor, preencha novamente",
        nome: true
      })
    }

    else if (req.body.clima == undefined || req.body.clima == null || req.body.clima == '') {
      res.json ({
        error: true,
        data: "Clima incorreto. Por favor, preencha novamente",
        clima: true
      })
    }

    else if (req.body.terreno == undefined || req.body.terreno == null || req.body.terreno == '') {
      res.json ({
        error: true,
        data: "Terreno incorreto. Por favor, preencha novamente",
        terreno: true
      })
    }
else { 
    planeta.save()
      .then(x => {
        res.status(201).send({ message: "Planeta cadastrado com sucesso!" });
      })
      .catch(e => {
        res.status(400).send({ message: "Falha ao cadastrar planeta!", data: e });
      });
}
  });
  

  // removendo planeta no banco mongodb
  app.delete("/planets", (req, res) => {
    Planeta.findOneAndRemove(req.params.id)
      .then(x => {
        res.status(200).send({
          message: "Planeta removido com sucesso!"
        });
      })
      .catch(x => {
        res.status(400).send({
          message: "Falha ao remover produto",
          data: e
        });
      });
  });
};
