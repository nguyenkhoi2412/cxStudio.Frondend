import encryptHelper from "@utils/encrypt.helper";
import MainContentCardWrapper from "@dashboard/_layout/mainContentCardWrapper";
import SubCard from "@components/mui-ui/cards/subCard";
// material-ui
import { Grid, Typography } from "@mui/material";
import { gridSpacing } from "@constants";

const GenerateKey = () => {
  var secretkey = {
    aes: {
      salt_key: encryptHelper.aes.generateKey(),
    },
    rsa: encryptHelper.rsa.generateKey(),
  };

  return (
    <MainContentCardWrapper
      title={`Generate key`}
      // secondary={
      //   <SecondaryAction link="https://next.material-ui.com/system/shadows/" />
      // }
    >
      <Grid item xs={12}>
        <SubCard title="AES Salt Key">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {secretkey.aes.salt_key}
              </Typography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12}>
        <SubCard title="RSA Public Key">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {secretkey.rsa.publicKey}
              </Typography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <Grid item xs={12}>
        <SubCard title="RSA Private key">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {secretkey.rsa.privateKey}
              </Typography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      {/* <Grid item xs={12}>
        <ul>
          <ol>AES Salt Key: {secretkey.aes.salt_key}</ol>
          <ol>RSA Public Key: {secretkey.rsa.publicKey}</ol>
          <ol>RSA Private key: {secretkey.rsa.privateKey}</ol>
        </ul>
      </Grid> */}
    </MainContentCardWrapper>
  );
};

export default GenerateKey;
