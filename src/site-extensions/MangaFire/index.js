import BaseModule from '../base.js';

export default class MangaFire extends BaseModule {

    static FAVICON_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEVHcEwva5pteYc1ea1AUWU4gLfv7/H09fd+n7zs7/Hb3eA3frU3frTf4OM5hb////82fbQrY5AuapozdaopXIYkUXchSWwdQF4jVn8wcKINLk0HO2IAFTfX3eMWZp1ulrkHRnNwhZq4xNCms8GSm6VSaoOXp7drI841AAAADnRSTlMA+P3x/a2s/iH6V2NaYJ45aqEAAAFaSURBVDiNfZOJ0oIgEIC3UtH/aE1NlEO83/8RWyGT7PhGYY8PcJwBAOLw/IEwBuJ3VzV+8kfr052Q+IU0hjB9xuDZT0M4rWGeDjmNA/a5J5wgf9DrhkaDdnoA9Ro1DA0lzbNwgHqlQcQ8qzNjao8DZCu0A2LaUJBt+MKlJwGN3yYOcNlYtsC5ujwBxSMsMnxjQLFRGWuYyqsV4GettsZEtWoTHFc7dFZgbVV17b0BV0s7uQndZ7Rt37eu4wSpu9LOiTOk1DiVTigJOWNX2oA5oaOzBmlLTkAc5T2wLBvNd4ETE5UEzWLADV5yekg4Ss4p15Mo/X5HZUkvCKSVPe4ZaUfR0QgBDkJM+75WXHAxUg84MiXUXggE9cVMASj9ThALik4+glKBEnwv9IpYqgGgHiY1vnykHo+2yGD5d4y9CCsJRB97lgji7wJd3/9v/Z/lesdRwt6SRLT+BljISDd+iC7CAAAAAElFTkSuQmCC"

    static _makeLink(id) {
        return id
    }

    static async _getRating(id) {
        return "-"
    }
}