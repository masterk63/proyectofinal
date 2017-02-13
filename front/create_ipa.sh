#!/bin/bash

# Thanks to: https://gist.github.com/DavidFrahm/4409d6b74e46377e7be7
# Usage: ./create_ipa.sh <Scheme Name> <Provisioning Profile>

echo "Building Ionic iOS release..."
ionic build --release ios
pushd platforms/ios/
echo "Building archive file..."
xcodebuild -scheme "$1" -configuration Release clean archive -archivePath "build/$1.xcarchive"
echo "Generating ipa file..."
xcrun xcodebuild -exportArchive -archivePath "build/$1.xcarchive" -exportPath "build/$1.ipa" -exportProvisioningProfile "$2"
echo "Cleaning up files..."
rm -rf "build/$1.xcarchive"
popd