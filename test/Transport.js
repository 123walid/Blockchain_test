const { assert } = require("chai");

const Transport = artifacts.require("./Transport");

contract('Transport',(accounts)=>{
    let transport
    before (async()=>{
        transport= await Transport.deployed()
    })
    describe('deployment',async()=>{
        it('deploys successfully',async()=>{
            const address = await transport.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)

        })
    })
    describe('post',async()=>{
        let result, count
        before(async()=>{
            
            result = await transport.ajout_transporteur(14586957,'Mensi','Walid',56942233,78498398,5)
        count = await transport.count

        })
        it('ajout',async()=>{
        
        //sucess
        assert.notEqual(count,0)
        const event = result.logs[0]
        console.log(event)
    })
    
        it('list',async()=>{
            const post = await transport.transporteurs(2)
            console.log(post)
        })
    })
})
