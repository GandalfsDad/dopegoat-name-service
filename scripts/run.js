const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("dgt");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);
    
    //register
    let txn = await domainContract.register("doom",{value: hre.ethers.utils.parseEther('0.3')});
    await txn.wait();

    //get owner
    let domainOwner = await domainContract.getAddress("doom");
    console.log("Owner of domain:", domainOwner);

    //setrecord
    txn = await domainContract.setRecord("doom","Here is some doom");
    await txn.wait();

    //getrecord
    let record = await domainContract.getRecord("doom");
    console.log("Record of domain:", record);

    //register
    txn = await domainContract.connect(randomPerson).register("ooph",{value: hre.ethers.utils.parseEther('0.3')});
    await txn.wait();

    //get owner
    domainOwner = await domainContract.connect(randomPerson).getAddress("ooph");
    console.log("Owner of domain:", domainOwner);

    //setrecord
    txn = await domainContract.connect(randomPerson).setRecord("ooph","Here is some more doom");
    await txn.wait();

    //getrecord
    record = await domainContract.connect(randomPerson).getRecord("ooph");
    console.log("Record of domain:", record);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();