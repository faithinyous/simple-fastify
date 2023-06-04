import {PostgresDataSource} from "../data-source";
import {FastifyHttpsOptions, FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {FastifyPluginCallback, FastifyPluginOptions} from "fastify/types/plugin";

export default class User{
    public static async userList(fastify:any, opts:any,next:any) {
            fastify.get('/', async (req:FastifyRequest,res:FastifyReply)=>{
                try {
                    const users = await PostgresDataSource.query('SELECT * FROM "user"')
                    res.status(200).send({users: users})
                } catch (e) {
                    res.status(500).send({message: 'Something went wrong'})
                }
            })

        next()
    }
}