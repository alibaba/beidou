import {Controller} from 'egg'

export default class HomeController extends Controller {
    async index() {
        // render view template in `app/views`
        await this.ctx.render('page', {from: 'server'});
    }
}

