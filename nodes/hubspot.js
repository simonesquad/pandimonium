const hubspot = require('@hubspot/api-client')

class HubspotAPI {
    constructor(config, secret) {
        this.config = config
        this.secret = secret
        this.apiKey = this.secret['hubspot-basic_api_key']
        this.hubspotClient = new hubspot.Client({ apiKey: this.apiKey })
    }

    create = async function(entity, record) {
        let payload = {}
        if (entity === 'contacts') {
            payload = {
                properties: {
                    email: record[0],
                    firstname: record[1],
                    lastname: record[2],
                    note: record[3],
                    city: record[4],
                    state: record[5],
                    country: record[6],
                    zip: record[7]
                }
            }
        } else if (entity === 'notes') {
            payload = {
                properties: {
                    tweet: record[3],
                    time: record[8],
                    hashtags: record[9]

                }
            }
        }
        else {
            console.error('Off the Grid', entity)
            return
        }
        await this.hubspotClient.crm[entity].basicApi.create(payload)
    }
}

module.exports = HubspotAPI