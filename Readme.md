# Git Project Commands

1. Take clone from 'main' branch. Also you can copy below link 👇
   
   [Repo Link](https://github.com/thisisaj1999/bakeHouseRepo.git)

   ```Bash
   git clone https://github.com/thisisaj1999/bakeHouseServer.git
   ```

2. After taking clone take fresh pull from main branch 

   ```Bash
   git pull origin main
   ```

3. Then checkout to 'feat/MERN' branch using
   
   ```Bash
   git checkout feat/MERN
   ```

4. Then you can goto your folder i.e. server, and make changes there.

5. Now, when you have made changes to your folder, now this is the time to make some commits.

6. We'll divide this task in three parts 
   - Before commit
   - Middle commit
   - After commit

7. Now, In "**Before commit**" phase you have to make sure that you're working on latest code (to avoid conflicts), to avoid conflicts follow the below mentioned commands
   
   - Firstly, remove the changes from current file and temporarily store them somewhere else.
    
    ```Bash
        git stash         # to temporarily store the changes
    ```
   - Now, once the changes are stashed you can take pull from dev/main branch   -- follow above point no. 2.

   - Once you've taken the pull from the main branch, now it's time to pop you stash and check conflicts.

    ```Bash
        git stash pop     # to restore the changes      
    ```

8. In "**Middle commit**" phase and if you didn't got any conflicts in code, this is the time to commit your changes to your current branch.

    - To commit your changes make sure the message you write should reflect the changes you've done and also keep it short and crisp: 
  
    ```Bash
        git commit -m "your message"
    ```

9. After you've made a commit, you will goto "**After commit**" phase. This is the important part among all the phases.
    
    - Once the commit is created, you'll need to push those commits to your current branch, and before pushing you code confirm the branch name using below command
    
    ```Bash
        git branch --show-current
    ``` 

    - Now, push the changes the your current branch

    ```Bash
        git push origin branchName   # use your current branch name in 'branchName'
    ```

    - After you've pushed your code, now need to create a merge request
      <br/>
        - goto the repository in github
        - Click on 'Pull requests' tab there
        - Now, click on 'New pull request' button
        - And check and confirm the branches
        - Now create the request and if you want then you can give description for the changes you've made.
