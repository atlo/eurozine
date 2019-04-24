const fs = require('fs')

function parseCsv (data) {
  const [head, ...tail] = data.split('\n')
  
  const years = head
    .split(',')

  return tail
    .map((row, rowIndex) => {
      const columns = row.split(',')

      return columns.map((column, index) => {
        if (index > 0) {
          return {
            year: years[index],
            country: columns[0],
            number: columns[index]
          }
        }
      })
      .filter(x => x)
    })
    .filter(i => i.length > 0)
    .reduce((acc, n) => [...acc, ...n], [])
}

function showError (error) {
  if (error) {
    console.log(error)
    process.exit(1)
  }
}

fs.readFile('data/Szűrt adatok/crime_burglary.csv', 'utf8', function (error, data) {
  showError(error)

  const parsedData = parseCsv(data)

  fs.writeFile('data.json', JSON.stringify(parsedData), function (error) {
    showError(error)

    console.log('finished succesfully')
    process.exit()
  })
})
