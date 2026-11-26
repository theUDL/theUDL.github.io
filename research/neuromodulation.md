Many disorders of the nervous system come down to nerves sending the wrong signals: too much, too little, or at the wrong time. Chronic pain is the most common example.

The tools we have to correct those signals each carry a cost. Drugs act on the whole body. Implanted electrical stimulators are precise, but they require surgery. Electrodes on the skin need no surgery, but they cannot reach a deep nerve without also stimulating everything above it.

Focused ultrasound offers a different trade. Sound waves pass through skin and muscle and can be concentrated on a spot a few millimetres wide, centimetres below the surface. Our lab studies how that focused energy changes nerve activity, and builds the imaging needed to deliver it reliably.

![Focused ultrasound concentrates sound energy on a small target deep in the body, without surgery.](media/research/neuromodulation-web.png)

## Can sound switch on a nerve?

The first question was whether it works at all in a living animal.

Aiming focused ultrasound at the sciatic nerve of a mouse, through intact skin, produced electrical activity in the muscle that nerve controls, and a visible twitch of the leg. Cutting the nerve below the target made the response disappear, which confirmed that the nerve itself was carrying the signal. The responses matched those from conventional electrical stimulation in size and timing, and the nerve and surrounding tissue showed no damage ([Downs et al., *Physics in Medicine and Biology*](https://doi.org/10.1088/1361-6560/aa9fc2)).

## A push you can measure

Ultrasound does several things to tissue at once. It pushes on it, it warms it, and it can set tiny gas pockets vibrating. To use it safely, you need to know which of these is doing the work.

So we watched the nerve itself. Filming at thousands of frames per second while the focused ultrasound was on, we measured how far the nerve moved with each pulse. Two things stood out. Nothing happened in the muscle until the nerve had been pushed about 18 micrometres, less than the width of a hair. Beyond that point, a bigger push gave a bigger response ([Lee et al., *IEEE Transactions on Medical Imaging*](https://doi.org/10.1109/TMI.2020.2992498)).

> What matters is how far the nerve moves, not what the machine is set to.

Temperature turned out to matter as well. Warmer tissue moved more, and showed more bubble activity, under exactly the same ultrasound exposure ([McCune et al., *IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control*](https://doi.org/10.1109/TUFFC.2023.3280455)). The setting on the device, in other words, is a poor guide to what the nerve experiences.

## Seeing the dose as it is delivered

If the movement of the nerve predicts the response, then it can be used as feedback: to confirm the beam is on target, and to measure how strongly the nerve is being engaged, while the treatment is happening.

Making that work took two pieces of engineering.

The first was imaging *during* the pulse. Most methods take their pictures in the gaps between pulses, and so miss the moment that matters. We built a system that images while the ultrasound is on, and shows the nerve's movement in under a second ([Lee et al., *IEEE Transactions on Ultrasonics, Ferroelectrics, and Frequency Control*](https://doi.org/10.1109/TUFFC.2020.3014183)).

The second was cleaning up the picture. The treatment beam is far stronger than the faint echoes used for imaging, and it swamps them. We trained a neural network, FUS-Net, to remove that interference and recover images that conventional filters could not ([Lee et al., *IEEE Transactions on Medical Imaging*](https://doi.org/10.1109/TMI.2021.3128641)).

## First tests in people

With that guidance in place, we tried the approach on the median nerve in the human forearm.

The first lesson was about aim. The same device setting moved the nerve by different amounts from one session to the next, depending on how the probe was coupled to the skin, its angle, and where it was pointed. Without a live measurement, there would have been no way to know.

The second was an early sign of an effect: in a preliminary test, sonicating the nerve lowered ratings of a painful heat stimulus by about one point. That is a first observation, not proof, and it needs larger controlled studies.

## Watching the brain respond

Treating a nerve in the arm or leg changes activity in the brain, and the brain is where pain is ultimately felt.

Using ultrasound to image blood flow in the brain, we mapped how the cortex of a mouse responds when a peripheral nerve is treated with focused ultrasound. The response grew with the strength of the stimulation. Mice with nerve-injury pain showed altered patterns of brain connectivity, and focused ultrasound changed how their brains responded to pain ([Lee et al., *IEEE Transactions on Biomedical Engineering*](https://doi.org/10.1109/TBME.2024.3352025)).

This is where our two research areas meet: one ultrasound beam delivers the treatment, and another reads out its effect on the brain.

## What we want to find out next

We are working toward treatments that are dosed by what the tissue experiences, and confirmed by their effect on the nervous system.

- Which effect of ultrasound matters most, and under what conditions?
- Can live imaging make each treatment as reliable as the last?
- Can a brief, non-invasive treatment of a nerve give lasting relief from pain?

*Much of the work described here was carried out during Dr. Lee's training at Columbia University, with the collaborators named on each paper.*
