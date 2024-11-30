import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/SearchBar/Header';
import AddToCart from "./AddToCart";
import AddAddress from "./AddAddress";

const steps = ["Cart", "Address", "Payment"];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    useEffect(() => {
 
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const addedData = useSelector(
        (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
      );
    
    useEffect(() => {
        dispatch(addToCartProductsFinal());
      }, [dispatch]);
    
    let dataOnStepper;
    if (activeStep === 0 || activeStep === 1) {
        dataOnStepper = <AddToCart handleNext={handleNext} />;
    } else if (activeStep === 2) {
        dataOnStepper = <AddAddress handleNext={handleNext} totalAmount={totalAmount} activeStep={activeStep} />;
    } 
    else if (activeStep === 3) {
        
        dataOnStepper = <ProductPayment activeStep={activeStep} />;
    
    }

    return (
        <>
            <Header pincodeData={pincodeData} setPincodeData={setPincodeData} />
            <Box sx={{ width: '100%', marginTop: '40px', fontSize: '16px' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>

                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    fullWidth
                                    sx={{
                                        mr: { xs: 0, md: 1 },
                                        fontSize: { xs: '10px !important', md: 'inherit' } // Decrease font size on mobile
                                    }}
                                >
                                    Back
                                </Button>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                {isStepOptional(activeStep) && (
                                    <Button color="inherit" onClick={handleSkip} fullWidth>
                                        Skip
                                    </Button>
                                )}
                                <Button onClick={handleNext} fullWidth>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
                {dataOnStepper}
            </Box>
            <Footer />
        </>
    );
}
