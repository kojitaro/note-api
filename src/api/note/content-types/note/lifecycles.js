const ogs = require('open-graph-scraper');

async function updateSitedata(event)
{
    const url = event.params.data.url;

    const options = { url: url };
    try{
        const data = await ogs(options);

        const { error, result, response } = data;
        if(!error){
            event.params.data.site_title = result.ogTitle;
            event.params.data.site_image = result.ogImage ? result.ogImage.url : null;
            event.params.data.site_description = result.ogDescription;
        }else{
            event.params.data.error = result.errorDetails;
        }
    }catch(e){
        event.params.data.error = e.result.error;
    }
}


module.exports = {
    async beforeCreate(event) {
        await updateSitedata(event);
    },
  
    async beforeUpdate(event) {
        await updateSitedata(event);
    },
  };