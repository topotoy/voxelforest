@echo off
@setlocal EnableDelayedExpansion

rem ##################################
rem ## reset-git.bat | Chema Guerra ##
rem ##################################

set __USER=%1
set __REPO=%2

echo.
echo USER: %__USER%
echo REPO: %__REPO%

  echo.
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo - This operation will OBLITERATE both LOCAL and REMOTE files...
  echo.

if exist ".git\" (

  echo.
  echo - This is a highly dangerous irreversible operation.
  echo - If you really want to reset this git repository,
  echo   please first delete the .git folder.
  echo.

) else (

  if "%__USER%" equ "" (

    echo.
    echo - USER variable not set.
    echo.

  ) else (

    if "%__REPO%" equ "" (

      echo.
      echo - REPO variable not set.
      echo.

    ) else (

      rem ## 0.- Remove the history database from.

        rem rm -rf .git

      rem ## 1.- Recreate the repository from the current content only.

      git init
      git add .
      git commit -m "Initial commit"

      rem ## 2.- Push to github.com making sure to overwrite history.

      git remote add origin https://github.com/%__USER%/%__REPO%.git

      git push -u --force origin master
    )
  )
)
