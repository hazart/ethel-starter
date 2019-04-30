source .env

docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up -d

#sleep 1

while getopts ":l:" opt; do
  case $opt in
    l) link="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

if [[ $link = true ]]
then
  yarn install
  echo "=====> Link ethel-core"
  cd ..
  cd ethel-core
  npm link
  cd ..
  cd ethel-starter
  npm link ethel-core

  yarn install
elif [[ $link = false ]]
  then
    echo "=====> Skip Linking ethel-core"
else
  echo "=====> Do not Link ethel-core"
  yarn install
fi

yarn run dev