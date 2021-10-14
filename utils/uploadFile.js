
const addFile = async (req, res)=> {
    // Getting auth header
    // let headerAuth = req.headers['authorization'];
    // let user = jwtUtils.getUserId(headerAuth);
  
    let name = req.body.name;
  
        if (req.files) {
          let file = req.files.file;
          let filename = file.name;
          let lastDot = filename.lastIndexOf('.');
          let extension = filename.substring(lastDot + 1);
  
          let newCustomPath = createDir(user);
          let filePath = "./public/" + newCustomPath + "/" + filename;
  
          file.mv(filePath, (err) => {
            if (err) {
              return res.status(500).json({
                'status': 'failed',
                'code': 500,
                'message': 'une erreur interne s\'est produite',
                'error': err
              });
            } else {
              let _currentPath = "./public/" + newCustomPath + "/";
              let _newFileName = uuid() + '.' + extension;
              let pathToFile = path.join(_currentPath, filename);
              let newPathToFile = path.join(_currentPath, _newFileName);
  
              try {
                fs.renameSync(pathToFile, newPathToFile);
                if (name === 'pdfPieceIdentite') {
                  models.User.update({
                    pieceIdentite: _newFileName,
                  }, { where: { id: user } });
                }
                if (name === 'avatar') {
                  models.User.update({ avatar: _newFileName, }, { where: { id: user } });
                }
  
                return res.status(201).json({
                  'status': 'success',
                  'code': 201,
                  'message': 'Le fichier a été envoyé avec succès!',
                  'file': _newFileName
                });
              } catch (error) {
                throw error
              }
            }
          });
        }
  
  };

  module.exports.addFile = addFile;