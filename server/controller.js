module.exports = {
    shelf: (req, res) => {
        const db = req.app.get('db');
        const id = req.params.id;

        db.get_shelf([id]).then(inventory => {
            var maxBins = 5;
            let bins = [];
            for(var i = 0; i < maxBins; i++){
                if (inventory[i]){
                    bins[inventory[i].bin -1] = inventory[i];//Need to understand
                } else if(!bins[i]) {
                    bins[i] = null;
                }
            }
            res.status(200).send(bins)
        })

    },
    getBin: (req, res) => {
        const db = req.app.get('db');

        db.get_bin([req.params.id[0], req.params.id[1]]).then(inventory => {
           if(inventory.length > 0) {
            res.status(200).send(inventory[0]);
           } else {
               res.status(200).send(null)
           }
            
        })
    },
    update: (req, res) => {
        const db = req.app.get('db');
        const {name, price}= req.body;
        db.put_bin([req.params.id[0], req.params.id[1], name, price]).then(inventory => {
            res.status(200).send(inventory[0]);
        })
    },
    delete: (req, res) => {
        const db= req.app.get('db');

        db.delete_bin([req.params.id[0], req.params.id[1]]).then(inventory => {
            res.status(200).send('Deleted');
        })
    },
    create: (req, res) => {
        const db = req.app.get('db');

        db.get_bin([req.params.id[0], req.params.id[1]])
        .then(inventory => {
            if (inventory.length === 0){
                db.post_bin([req.body.name, 
                    req.params.id[0], 
                    req.params.id[1], 
                    req.body.image, 
                    req.body.price]).then(newBin => {
                        res.status(200).send(newBin);
                    })
            }else {
                res.status(200).send('Bin already taken');
            }
        })
    }

}