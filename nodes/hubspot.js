const hubspot = require('@hubspot/api-client')
// building the authentication middle ware for connecting to the hubspot api
class HubspotAPI {
    constructor(config, secret) {
        this.config = config
        this.secret = secret
        this.apiKey = this.secret['hubspot-basic_api_key']
        this.hubspotClient = new hubspot.Client({ apiKey: this.apiKey })
    }
// since we are pulling the contact from twitter, I am including only the screen name for now
    create = async function(entity, record) {
        let payload = {}
        if (entity === 'contacts') {
            payload = {
                properties: {
                    screen_name: record[1],
                    tweet: record[2],
                }
            }
// this should add more detail to their tweet record in the form of a note on hubspot
        } else if (entity === 'tweets') {
            payload = {
                properties: {
                    tweet: record[2],
                    time: record[3],
                    hashtags: record[4]

                }
            }
        }
        else {
            console.error('Off the Grid User', entity)
            return
        }
        // I believe this will create a new user if there is no existing record for one
        await this.hubspotClient.crm[entity].basicApi.create(payload)
    }
}

module.exports = HubspotAPI