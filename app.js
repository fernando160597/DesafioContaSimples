import app from './src/routes'

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})
