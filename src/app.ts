import {PostgresDataSource} from "../data-source";

require('dotenv').config()
import Fastify,{FastifyInstance} from 'fastify';
import cors from '@fastify/cors'
import User from "@/user";
class App{
    app:FastifyInstance
    port:number
    constructor(port:number){
        this.app = Fastify({logger:true});
        this.port = port;
    }
    private  async connectToDatabase() {
        // Logger.error('process.envprocess.envprocess.env', process.env)
        try {
            await PostgresDataSource.initialize().then(async (res) => {
                //force run migration
                await res.runMigrations()
                this.app.log.info('Data Source has been initialized!')
            })
        } catch (err) {
            this.app.log.error({message:'Error during Data Source initialization:',err: err})
            throw err
        }
    }
    public initialize(){
        return new Promise(async (resolve,reject)=>{
            try{
                await this.connectToDatabase();
                this.initializeMiddleware();
                this.initializeRouter();
                resolve(this);
            }catch(err){
                reject(err);
            }
        })
    }
    private initializeMiddleware(){
        this.app.register(cors,{
            origin:true,
            allowedHeaders:[
                '*',
                'Authorization',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'content-type'
            ],
            optionsSuccessStatus:200
        })
    }
    private initializeRouter(){
        this.app.get('/version',async(req,res)=>{
            return res.send('1.0.0')
        })
        this.app.register(User.userList,{ prefix: '/user' })

    }
    public listen(){
        this.app.listen({port:this.port ,host:'0.0.0.0'},(err,address)=>{
            if(err){
                console.log(err);
            }
            console.log(`Server listening at ${address}`)
        })
    }
}
export default App;