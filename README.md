# I will Monitor | An Application built with MERN stack
[Link to the Website](https://i-will-monitor.herokuapp.com/)

## Introduction

### Goal
The goal of this application is to provide a way for us to see how popular of certain keywords
in certain areas are.

We can verify our guess on the trend topic with the data sampled from Twitter easily.
And besides, we can also have a rough idea of whether we are living in an echo chamber or a filter bubble.

### Method
The data is collected from Twitter API.
With every search term, 100 sampled tweets are sent in to the backend.
Only those happened in the past 24 hours count and were accumulated.
In the end, the number shows how many tweets out of 100 happened in the past 24 hours.
          
![screenshot](https://qp9hsa.dm.files.1drv.com/y4m_tcu_pyS9JUs4J3294hESBoyX88nxHMnHXFkIHtFtpgu2h7J7Eu1A2kKldh5bcc2x_9AeZOasj961Fh1UKmdC2sYNAujxNMI1x26Hh1xKro_RtNwPbdD9-_wfXUiCUf8-ApthKjIy-Uqrb-_tFQE14k5pfE4TET4h96xnOTzm_AZMkQV5abKrSpr71wHTwM26B3K4ilQ6s0QtxUqBCys5w?width=1600&height=900&cropmode=none)

## Run

After forked and cloned the project, one would need to put their google map API key in .env file as following:

```
GEOCODE_API=<your API key here>
```

Then run the following commend in the root folder:
```
npm install
npm start
```
