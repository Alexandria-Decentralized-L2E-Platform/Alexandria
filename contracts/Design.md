# Contracts Architecture

## Contract List
1. Library Contract
    - create new program by deploying program contract & certificate contract
    - store content, quizzes, answer, other data
    - give out certificate by minting ERC721
2. Certificate Contract
    - ERC 721 representing the certificate after program completion
3. Learner Contract
    - ERC 721 representing a learner
    - only learner can earn form the program contract

## Datails
1. Library Contract
    - create new program by 
    - store 
        - content url
        - program name
        - quizzes (might be ipfs link)
        - answers
        - period
        - learner contract address 
        - factory address
        - reward limit
        - reward token
    - check input answers
    - mint certificate contract
    - distribute reward to learner
    - only learner can earn form the program contract
2. Certificate Contract
    - soulbound contract
    - Store program address
    - Store timestamp of compleetion
    - only mintable by program contract
3. Learner Contract
    - Non-transferrable
    - 1 address can only mint 1