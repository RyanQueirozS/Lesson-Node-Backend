import { App } from './app/app'

import { condRouter } from './condominium'

App.getInstance().addRoute('/condominium', condRouter.getRouter())

App.getInstance().run()
