  for i in {1..20}; do
    echo "Attempt $i"
    curl -X POST http://localhost:3001/api/login \
      -H "Content-Type: application/json" \
      -d '{"username":"alice","password":"wrong'$i'"}'
    echo ""
  done