import fs from 'fs'
// read data from db.json file 
export const getData = () => {
    try {
        const readData = fs.readFileSync('db.json', 'utf-8')
        const data = JSON.parse(readData)
        return data
    } catch (error) {
        if (error.code === 'ENOENT') {
            fs.writeFileSync('db.json', '[]', 'utf-8');
            return [];
        } else {
            console.log('Error reading data', error);
            return [];
        }
    }

}

// data in dbfile 
export const addData = (data) => {
    try {
        let dbfileData = {}
        const readData = fs.readFileSync('db.json', 'utf8')

        if (readData) {
            dbfileData = JSON.parse(readData)
        }

        dbfileData.candidate.push(data)


        const newData = JSON.stringify(dbfileData, null, 2)
        fs.writeFileSync('db.json', newData, 'utf-8');
        return dbfileData
    } catch (error) {
        console.log('Error adding data in db.json file', error);
        throw new error(error)
    }

}
