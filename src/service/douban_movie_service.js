module.exports = {
    getMovieListDataType: function( type ) {
        console.log(type)
        const url = 'http://localhost:7080/movielist?type='+ type
        return new Promise(function(resolve,reject) {
            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                // 这里resolve 一下 data
                // console.log(myJson);
                resolve( myJson )
            });
        })

    }
}