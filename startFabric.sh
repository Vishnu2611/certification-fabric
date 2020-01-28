./bin/configtxgen -profile CertVerificationGenesis -channelID mychannel -outputBlock ./channel-artifacts/genesis.block

./bin/configtxgen -profile CV_Channel -outputCreateChannelTx ./channel-artifacts/CV_Channel.tx -channelID cvchannel


./bin/configtxgen -profile CV_Channel -outputAnchorPeersUpdate ./channel-artifacts/CPAMSP_Channelanchors.tx -channelID cvchannel -asOrg CPAMSP

./bin/configtxgen -profile CV_Channel -outputAnchorPeersUpdate ./channel-artifacts/VerifierMSP_Channelanchors.tx -channelID cvchannel -asOrg VerifierMSP