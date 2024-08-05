require('dotenv').config();
const express = require('express')
const router = express.Router()
const path = require('path')
const Event = require('../models/Events')
const Utils = require('../utils')

// GET - get all events
router.get('/', (req, res) => {
  Event.find().populate()
    .then(events => {
      if (!events.length) {
        return res.status(404).json({
          message: "No events found"
        })
      }
      console.log(events)
      res.json(events)
    })
    .catch(err => {
      console.log('Error fetching events:', err)
      res.status(500).json({
        message: "Problem getting events"
      })
    })
})

// POST - create new Event
router.post('/', Utils.authenticateToken, (req, res) => {

  // validate


    // create new Event
    let newEvent = new Event({
      eventdisplayname: req.body.eventdisplayname,
      vendorcontactname: req.body.vendorcontactname,
      vendorcontactemail: req.body.vendorcontactemail,
      vendorcontactphone: req.body.vendorcontactphone,
      eventcategory: req.body.eventcategory,
      eventtag: req.body.eventtag,
      eventsaturdaytime: req.body.eventsaturdaytime,
      eventsundaytime: req.body.eventsundaytime,
      eventstallnumber: req.body.eventstallnumber,
      eventdescription: req.body.eventdescription,
      eventimage: req.body.eventimage,
    })

    newEvent.save()
      .then(Event => {
        return res.status(201).json(Event)
      })
      .catch(err => {
        console.error('Error saving Event:', err)
        return res.status(500).send({
          message: "Problem creating Event",
          error: err
        })
      })
  })
  
// export
module.exports = router
