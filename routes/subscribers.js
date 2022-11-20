const express = require("express")
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Creating the subscribers routers
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', getSubscriber, (req, res) => {
    console.log(res.subscriber)
    console.log("typeof res : ", typeof res)
    console.log("Object.keys(): ", Object.keys(res))
    console.log(res.heyMe)
    res.send(res.subscriber.name)
})

router.post('/', async (req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        // the status code 201 tells that you have created something, 201 is more specific than 200
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

router.patch('/:id', getSubscriber, async (req, res) => {
    // using PATCH because we only want update what the user passed to use, not all the user object.
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        console.log("updatedSubscriber : ",updatedSubscriber)
        console.log("Object.keys(updatedSubscriber) : ",Object.keys(updatedSubscriber))
        console.log("typeof updatedSubscriber : ",typeof updatedSubscriber)
        res.json(updatedSubscriber)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: "Subscriber Deleted!"})
    } catch (error) {
        res.status(500).json({messgae: error.messgae})
    }
})

// middleware function
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({messgae: 'Cannot find subscriber'})
        }
    } catch (error) {
        return res.status(500).json({messgae: error.message})
    }

    res.subscriber = subscriber
    res.heyMe = "Yahya"
    next()
}

module.exports = router