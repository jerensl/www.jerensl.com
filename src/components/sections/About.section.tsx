import * as React from 'react'
import { Grid } from '../Grid'
import { useReducedMotion, motion } from 'framer-motion'

export const AboutSection = (): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <Grid className="gap-x-16 gap-y-4 lg:gap-x-16">
            <div className="lg:max-w-4xl col-span-full md:col-span-4 lg:col-span-5">
                <motion.div
                    className="flex flex-auto flex-col"
                    initial="initial"
                    animate="visible"
                    variants={{
                        initial: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    <motion.div variants={childrenVariants}>
                        <h1 className="font-semibold text-2xl text-red-700 dark:text-red-400 lg:text-xl">
                            About Me
                        </h1>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pt-2 lg:text-2xl text-base font-bold">
                            Building with technical excellence and passion for
                            solving the right problem.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <div className="w-full col-span-full md:col-span-4 lg:col-span-7">
                <motion.div
                    className="flex flex-auto flex-col"
                    initial="initial"
                    animate="visible"
                    variants={{
                        initial: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            {`I've`} always been passionate about football and
                            software engineering, for me tackling complex
                            problems {`it's`} same as scoring a goal. In
                            football, it {`doesn't`} matter whether you play
                            good or bad at the end of that day winning or
                            outcome is what matters to all your fans, but as
                            people on the field what we can do is make good
                            decisions optimizing for a better outcome but still
                            manage our expectations because the bad outcome can
                            possible to occur. What we can do is to keep
                            improving for each iteration and still need to
                            manage our risk so that catastrophic failure does
                            not happen, this example is like football when we
                            play attacking but still make sure to maintain
                            balance on our defensive transition.
                        </p>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            In my opinion, learning new technology is cool but
                            learning technologies that still survive for decades
                            are awesome, what I mean is it`s a technology still
                            widely used, not deprecated.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </Grid>
    )
}
