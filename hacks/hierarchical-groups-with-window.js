// Log for an entire job (multiple jobs per workflow)
const fullLog = `2025-04-23T06:09:04.1443946Z Current runner version: '2.323.0'

2025-04-23T06:09:04.1468637Z ##[group]Operating System
2025-04-23T06:09:04.1469543Z Ubuntu
2025-04-23T06:09:04.1470081Z 24.04.2
2025-04-23T06:09:04.1470588Z LTS
2025-04-23T06:09:04.1471168Z ##[endgroup]
2025-04-23T06:09:04.1471734Z ##[group]Runner Image

2025-04-23T06:09:04.1472302Z Image: ubuntu-24.04
2025-04-23T06:09:04.1472957Z Version: 20250413.1.0
2025-04-23T06:09:04.1474117Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20250413.1/images/ubuntu/Ubuntu2404-Readme.md
2025-04-23T06:09:04.1475921Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20250413.1
2025-04-23T06:09:04.1476982Z ##[endgroup]
2025-04-23T06:09:04.1477552Z ##[group]Runner Image Provisioner
2025-04-23T06:09:04.1478205Z 2.0.422.1
2025-04-23T06:09:04.1478767Z ##[endgroup]
2025-04-23T06:09:04.1479900Z ##[group]GITHUB_TOKEN Permissions
2025-04-23T06:09:04.1481897Z Contents: read
2025-04-23T06:09:04.1482468Z Metadata: read
2025-04-23T06:09:04.1483311Z Packages: read
2025-04-23T06:09:04.1483922Z ##[endgroup]
2025-04-23T06:09:04.1487001Z Secret source: Actions
2025-04-23T06:09:04.1487767Z Prepare workflow directory
2025-04-23T06:09:04.1814743Z Prepare all required actions
2025-04-23T06:09:04.1851288Z Getting action download info
2025-04-23T06:09:04.3900983Z ##[group]Download immutable action package 'actions/checkout@v2'
2025-04-23T06:09:04.3902052Z Version: 2.7.0
2025-04-23T06:09:04.3903191Z Digest: sha256:95d28907bc868c0bab52f05f1f84cf8416c9415fba4c92519bc0b83bdce1eae3
2025-04-23T06:09:04.3904435Z Source commit SHA: ee0669bd1cc54295c223e0bb666b733df41de1c5
2025-04-23T06:09:04.3905546Z ##[endgroup]
2025-04-23T06:09:04.5595677Z Complete job name: npm-audit
2025-04-23T06:09:04.6307022Z ##[group]Run actions/checkout@v2
2025-04-23T06:09:04.6308443Z with:
2025-04-23T06:09:04.6309255Z   repository: gfs-hybrid-services/bjs-proxy
2025-04-23T06:09:04.6310552Z   token: ***
2025-04-23T06:09:04.6311281Z   ssh-strict: true
2025-04-23T06:09:04.6312081Z   persist-credentials: true
2025-04-23T06:09:04.6313653Z   clean: true
2025-04-23T06:09:04.6314409Z   fetch-depth: 1
2025-04-23T06:09:04.6315412Z   lfs: false
2025-04-23T06:09:04.6316199Z   submodules: false
2025-04-23T06:09:04.6317077Z   set-safe-directory: true
2025-04-23T06:09:04.6318457Z ##[endgroup]
2025-04-23T06:09:04.8796675Z Syncing repository: gfs-hybrid-services/bjs-proxy
2025-04-23T06:09:04.8799185Z ##[group]Getting Git version info
2025-04-23T06:09:04.8800416Z Working directory is '/home/runner/work/bjs-proxy/bjs-proxy'
2025-04-23T06:09:04.8801685Z [command]/usr/bin/git version
2025-04-23T06:09:04.8802266Z git version 2.49.0
2025-04-23T06:09:04.8803759Z ##[endgroup]
2025-04-23T06:09:04.8810420Z Temporarily overriding HOME='/home/runner/work/_temp/660e4d6e-ce81-4632-8387-971296291832' before making global git config changes
2025-04-23T06:09:04.8811892Z Adding repository directory to the temporary git global config as a safe directory
2025-04-23T06:09:04.8813633Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/bjs-proxy/bjs-proxy
2025-04-23T06:09:04.8819387Z Deleting the contents of '/home/runner/work/bjs-proxy/bjs-proxy'
2025-04-23T06:09:04.8821549Z ##[group]Initializing the repository
2025-04-23T06:09:04.8822840Z [command]/usr/bin/git init /home/runner/work/bjs-proxy/bjs-proxy
2025-04-23T06:09:04.8846489Z hint: Using 'master' as the name for the initial branch. This default branch name
2025-04-23T06:09:04.8849283Z hint: is subject to change. To configure the initial branch name to use in all
2025-04-23T06:09:04.8851186Z hint: of your new repositories, which will suppress this warning, call:
2025-04-23T06:09:04.8852926Z hint:
2025-04-23T06:09:04.8854382Z hint: 	git config --global init.defaultBranch <name>
2025-04-23T06:09:04.8856858Z hint:
2025-04-23T06:09:04.8858016Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2025-04-23T06:09:04.8859859Z hint: 'development'. The just-created branch can be renamed via this command:
2025-04-23T06:09:04.8861445Z hint:
2025-04-23T06:09:04.8862796Z hint: 	git branch -m <name>
2025-04-23T06:09:04.8865357Z Initialized empty Git repository in /home/runner/work/bjs-proxy/bjs-proxy/.git/
2025-04-23T06:09:04.8870637Z [command]/usr/bin/git remote add origin https://github.com/gfs-hybrid-services/bjs-proxy
2025-04-23T06:09:04.8906543Z ##[endgroup]
2025-04-23T06:09:04.8908276Z ##[group]Disabling automatic garbage collection
2025-04-23T06:09:04.8910705Z [command]/usr/bin/git config --local gc.auto 0
2025-04-23T06:09:04.8945019Z ##[endgroup]
2025-04-23T06:09:04.8947945Z ##[group]Setting up auth
2025-04-23T06:09:04.8952344Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-04-23T06:09:04.8987129Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-04-23T06:09:04.9317853Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-04-23T06:09:04.9348828Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-04-23T06:09:04.9583650Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2025-04-23T06:09:04.9621118Z ##[endgroup]
2025-04-23T06:09:04.9623947Z ##[group]Fetching the repository
2025-04-23T06:09:04.9630980Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --progress --no-recurse-submodules --depth=1 origin +06654af8ecacaa815b5096e64355726504132a3e:refs/remotes/origin/main
2025-04-23T06:09:05.4691452Z remote: Enumerating objects: 127, done.        
2025-04-23T06:09:05.4693127Z remote: Counting objects:   0% (1/127)        
2025-04-23T06:09:05.4694605Z remote: Counting objects:   1% (2/127)        
2025-04-23T06:09:05.4696341Z remote: Counting objects:   2% (3/127)        
2025-04-23T06:09:05.4697800Z remote: Counting objects:   3% (4/127)        
2025-04-23T06:09:05.4699259Z remote: Counting objects:   4% (6/127)        
2025-04-23T06:09:05.4700675Z remote: Counting objects:   5% (7/127)        
2025-04-23T06:09:05.4702062Z remote: Counting objects:   6% (8/127)        
2025-04-23T06:09:05.4703433Z remote: Counting objects:   7% (9/127)        
2025-04-23T06:09:05.4704814Z remote: Counting objects:   8% (11/127)        
2025-04-23T06:09:05.4706427Z remote: Counting objects:   9% (12/127)        
2025-04-23T06:09:05.4707838Z remote: Counting objects:  10% (13/127)        
2025-04-23T06:09:05.4709307Z remote: Counting objects:  11% (14/127)        
2025-04-23T06:09:05.4710821Z remote: Counting objects:  12% (16/127)        
2025-04-23T06:09:05.4712315Z remote: Counting objects:  13% (17/127)        
2025-04-23T06:09:05.4713804Z remote: Counting objects:  14% (18/127)        
2025-04-23T06:09:05.4715439Z remote: Counting objects:  15% (20/127)        
2025-04-23T06:09:05.4716957Z remote: Counting objects:  16% (21/127)        
2025-04-23T06:09:05.4718691Z remote: Counting objects:  17% (22/127)        
2025-04-23T06:09:05.4720783Z remote: Counting objects:  18% (23/127)        
2025-04-23T06:09:05.4722665Z remote: Counting objects:  19% (25/127)        

2025-04-23T06:09:05.4724414Z remote: Counting objects:  20% (26/127)        
2025-04-23T06:09:05.4725874Z remote: Counting objects:  21% (27/127)        
2025-04-23T06:09:05.4726969Z remote: Counting objects:  22% (28/127)        
2025-04-23T06:09:05.4728250Z remote: Counting objects:  23% (30/127)        
2025-04-23T06:09:05.4729608Z remote: Counting objects:  24% (31/127)        
2025-04-23T06:09:05.4730968Z remote: Counting objects:  25% (32/127)        
2025-04-23T06:09:05.4732343Z remote: Counting objects:  26% (34/127)        
2025-04-23T06:09:05.4733751Z remote: Counting objects:  27% (35/127)        
2025-04-23T06:09:05.4735701Z remote: Counting objects:  28% (36/127)        
2025-04-23T06:09:05.4756950Z remote: Counting objects:  29% (37/127)        
2025-04-23T06:09:05.4759291Z remote: Counting objects:  30% (39/127)        
2025-04-23T06:09:05.4761214Z remote: Counting objects:  31% (40/127)        
2025-04-23T06:09:05.4763338Z remote: Counting objects:  32% (41/127)        
2025-04-23T06:09:05.4765502Z remote: Counting objects:  33% (42/127)        
2025-04-23T06:09:05.4767551Z remote: Counting objects:  34% (44/127)        
2025-04-23T06:09:05.4769501Z remote: Counting objects:  35% (45/127)        
2025-04-23T06:09:05.4771456Z remote: Counting objects:  36% (46/127)        
2025-04-23T06:09:05.4773433Z remote: Counting objects:  37% (47/127)        
2025-04-23T06:09:05.4775590Z remote: Counting objects:  38% (49/127)        
2025-04-23T06:09:05.4777631Z remote: Counting objects:  39% (50/127)        
2025-04-23T06:09:05.4779633Z remote: Counting objects:  40% (51/127)        
2025-04-23T06:09:05.4781618Z remote: Counting objects:  41% (53/127)        
2025-04-23T06:09:05.4783592Z remote: Counting objects:  42% (54/127)        
2025-04-23T06:09:05.4785788Z remote: Counting objects:  43% (55/127)        

2025-04-23T06:09:05.4788059Z remote: Counting objects:  44% (56/127)        
2025-04-23T06:09:05.4790064Z remote: Counting objects:  45% (58/127)        
2025-04-23T06:09:05.4791974Z remote: Counting objects:  46% (59/127)        
2025-04-23T06:09:05.4794041Z remote: Counting objects:  47% (60/127)        
2025-04-23T06:09:05.4796123Z remote: Counting objects:  48% (61/127)        
2025-04-23T06:09:05.4798285Z remote: Counting objects:  49% (63/127)        
2025-04-23T06:09:05.4800200Z remote: Counting objects:  50% (64/127)        
2025-04-23T06:09:05.4802134Z remote: Counting objects:  51% (65/127)        

2025-04-23T06:09:05.4804274Z remote: Counting objects:  52% (67/127)        
2025-04-23T06:09:05.4806397Z remote: Counting objects:  53% (68/127)        
2025-04-23T06:09:05.4808310Z remote: Counting objects:  54% (69/127)        
2025-04-23T06:09:05.4810226Z remote: Counting objects:  55% (70/127)        
2025-04-23T06:09:05.4812123Z remote: Counting objects:  56% (72/127)        
2025-04-23T06:09:05.4814054Z remote: Counting objects:  57% (73/127)        
2025-04-23T06:09:05.4816082Z remote: Counting objects:  58% (74/127)        
2025-04-23T06:09:05.4817968Z remote: Counting objects:  59% (75/127)        

2025-04-23T06:09:05.4819858Z remote: Counting objects:  60% (77/127)        
2025-04-23T06:09:05.4821752Z remote: Counting objects:  61% (78/127)        
2025-04-23T06:09:05.4823641Z remote: Counting objects:  62% (79/127)        
2025-04-23T06:09:05.4825670Z remote: Counting objects:  63% (81/127)        
2025-04-23T06:09:05.4827585Z remote: Counting objects:  64% (82/127)        
2025-04-23T06:09:05.4829556Z remote: Counting objects:  65% (83/127)        
2025-04-23T06:09:05.4831484Z remote: Counting objects:  66% (84/127)        
2025-04-23T06:09:05.4833385Z remote: Counting objects:  67% (86/127)        
2025-04-23T06:09:05.4835418Z remote: Counting objects:  68% (87/127)        
2025-04-23T06:09:05.4837412Z remote: Counting objects:  69% (88/127)        
2025-04-23T06:09:05.4839347Z remote: Counting objects:  70% (89/127)        
2025-04-23T06:09:05.4841263Z remote: Counting objects:  71% (91/127)        
2025-04-23T06:09:05.4843155Z remote: Counting objects:  72% (92/127)        
2025-04-23T06:09:05.4845193Z remote: Counting objects:  73% (93/127)        
2025-04-23T06:09:05.4847094Z remote: Counting objects:  74% (94/127)        
2025-04-23T06:09:05.4848968Z remote: Counting objects:  75% (96/127)        

2025-04-23T06:09:05.4850871Z remote: Counting objects:  76% (97/127)        
2025-04-23T06:09:05.4852783Z remote: Counting objects:  77% (98/127)        
2025-04-23T06:09:05.4854717Z remote: Counting objects:  78% (100/127)        
2025-04-23T06:09:05.4856885Z remote: Counting objects:  79% (101/127)        
2025-04-23T06:09:05.4858826Z remote: Counting objects:  80% (102/127)        

2025-04-23T06:09:05.4860750Z remote: Counting objects:  81% (103/127)        
2025-04-23T06:09:05.4862665Z remote: Counting objects:  82% (105/127)        
2025-04-23T06:09:05.4864829Z remote: Counting objects:  83% (106/127)        
2025-04-23T06:09:05.4867591Z remote: Counting objects:  84% (107/127)        

2025-04-23T06:09:05.4871237Z remote: Counting objects:  85% (108/127)        
2025-04-23T06:09:05.4875443Z remote: Counting objects:  86% (110/127)        
2025-04-23T06:09:05.4879466Z remote: Counting objects:  87% (111/127)        
2025-04-23T06:09:05.4881701Z remote: Counting objects:  88% (112/127)        

2025-04-23T06:09:05.4883814Z remote: Counting objects:  89% (114/127)        
2025-04-23T06:09:05.4886187Z remote: Counting objects:  90% (115/127)        
2025-04-23T06:09:05.4888406Z remote: Counting objects:  91% (116/127)        
2025-04-23T06:09:05.4890651Z remote: Counting objects:  92% (117/127)        
2025-04-23T06:09:05.4892495Z remote: Counting objects:  93% (119/127)        
2025-04-23T06:09:05.4895136Z remote: Counting objects:  94% (120/127)        
2025-04-23T06:09:05.4896587Z remote: Counting objects:  95% (121/127)        
2025-04-23T06:09:05.4898009Z remote: Counting objects:  96% (122/127)        

2025-04-23T06:09:05.4899891Z remote: Counting objects:  97% (124/127)        
2025-04-23T06:09:05.4901967Z remote: Counting objects:  98% (125/127)        
2025-04-23T06:09:05.4904190Z remote: Counting objects:  99% (126/127)        
2025-04-23T06:09:05.4906685Z remote: Counting objects: 100% (127/127)        
2025-04-23T06:09:05.4909040Z remote: Counting objects: 100% (127/127), done.        
2025-04-23T06:09:05.4911394Z remote: Compressing objects:   0% (1/108)        
2025-04-23T06:09:05.4913651Z remote: Compressing objects:   1% (2/108)        
2025-04-23T06:09:05.4918200Z remote: Compressing objects:   2% (3/108)        
2025-04-23T06:09:05.4920678Z remote: Compressing objects:   3% (4/108)        
2025-04-23T06:09:05.4922332Z remote: Compressing objects:   4% (5/108)        
2025-04-23T06:09:05.4923756Z remote: Compressing objects:   5% (6/108)        
2025-04-23T06:09:05.4925380Z remote: Compressing objects:   6% (7/108)        
2025-04-23T06:09:05.4926826Z remote: Compressing objects:   7% (8/108)        
2025-04-23T06:09:05.4928244Z remote: Compressing objects:   8% (9/108)        
2025-04-23T06:09:05.4929658Z remote: Compressing objects:   9% (10/108)        

2025-04-23T06:09:05.4931060Z remote: Compressing objects:  10% (11/108)        
2025-04-23T06:09:05.4932483Z remote: Compressing objects:  11% (12/108)        

2025-04-23T06:09:05.4933908Z remote: Compressing objects:  12% (13/108)        
2025-04-23T06:09:05.4935598Z remote: Compressing objects:  13% (15/108)        

2025-04-23T06:09:05.4937053Z remote: Compressing objects:  14% (16/108)        
2025-04-23T06:09:05.4938787Z remote: Compressing objects:  15% (17/108)        

2025-04-23T06:09:05.4940262Z remote: Compressing objects:  16% (18/108)        
2025-04-23T06:09:05.4941708Z remote: Compressing objects:  17% (19/108)        

2025-04-23T06:09:05.4943151Z remote: Compressing objects:  18% (20/108)        
2025-04-23T06:09:05.4944586Z remote: Compressing objects:  19% (21/108)        

2025-04-23T06:09:05.4946230Z remote: Compressing objects:  20% (22/108)        
2025-04-23T06:09:05.4947629Z remote: Compressing objects:  21% (23/108)        

2025-04-23T06:09:05.4949037Z remote: Compressing objects:  22% (24/108)        
2025-04-23T06:09:05.4950453Z remote: Compressing objects:  23% (25/108)        

2025-04-23T06:09:05.4951883Z remote: Compressing objects:  24% (26/108)        
2025-04-23T06:09:05.4953291Z remote: Compressing objects:  25% (27/108)        
2025-04-23T06:09:05.4954710Z remote: Compressing objects:  26% (29/108)        
2025-04-23T06:09:05.4956375Z remote: Compressing objects:  27% (30/108)        
2025-04-23T06:09:05.4957801Z remote: Compressing objects:  28% (31/108)        
2025-04-23T06:09:05.4959216Z remote: Compressing objects:  29% (32/108)        

2025-04-23T06:09:05.4960637Z remote: Compressing objects:  30% (33/108)        
2025-04-23T06:09:05.4962041Z remote: Compressing objects:  31% (34/108)        

2025-04-23T06:09:05.4963451Z remote: Compressing objects:  32% (35/108)        
2025-04-23T06:09:05.4965272Z remote: Compressing objects:  33% (36/108)        

2025-04-23T06:09:05.4966736Z remote: Compressing objects:  34% (37/108)        
2025-04-23T06:09:05.4968145Z remote: Compressing objects:  35% (38/108)        

2025-04-23T06:09:05.4969696Z remote: Compressing objects:  36% (39/108)        
2025-04-23T06:09:05.4971102Z remote: Compressing objects:  37% (40/108)        

2025-04-23T06:09:05.4972508Z remote: Compressing objects:  38% (42/108)        
2025-04-23T06:09:05.4973910Z remote: Compressing objects:  39% (43/108)        

2025-04-23T06:09:05.4975552Z remote: Compressing objects:  40% (44/108)        
2025-04-23T06:09:05.4976977Z remote: Compressing objects:  41% (45/108)        

2025-04-23T06:09:05.4978372Z remote: Compressing objects:  42% (46/108)        
2025-04-23T06:09:05.4979770Z remote: Compressing objects:  43% (47/108)        

2025-04-23T06:09:05.4981164Z remote: Compressing objects:  44% (48/108)        
2025-04-23T06:09:05.4982533Z remote: Compressing objects:  45% (49/108)        

2025-04-23T06:09:05.4983907Z remote: Compressing objects:  46% (50/108)        
2025-04-23T06:09:05.4985405Z remote: Compressing objects:  47% (51/108)        

2025-04-23T06:09:05.4986755Z remote: Compressing objects:  48% (52/108)        
2025-04-23T06:09:05.4988105Z remote: Compressing objects:  49% (53/108)        

2025-04-23T06:09:05.4989460Z remote: Compressing objects:  50% (54/108)        
2025-04-23T06:09:05.4990813Z remote: Compressing objects:  51% (56/108)        

2025-04-23T06:09:05.4992161Z remote: Compressing objects:  52% (57/108)        
2025-04-23T06:09:05.4993514Z remote: Compressing objects:  53% (58/108)        

2025-04-23T06:09:05.4995118Z remote: Compressing objects:  54% (59/108)        
2025-04-23T06:09:05.4996641Z remote: Compressing objects:  55% (60/108)        

2025-04-23T06:09:05.4998019Z remote: Compressing objects:  56% (61/108)        
2025-04-23T06:09:05.4999362Z remote: Compressing objects:  57% (62/108)        

2025-04-23T06:09:05.5000722Z remote: Compressing objects:  58% (63/108)        
2025-04-23T06:09:05.5002090Z remote: Compressing objects:  59% (64/108)        

2025-04-23T06:09:05.5003447Z remote: Compressing objects:  60% (65/108)        
2025-04-23T06:09:05.5004806Z remote: Compressing objects:  61% (66/108)        

2025-04-23T06:09:05.5006335Z remote: Compressing objects:  62% (67/108)        
2025-04-23T06:09:05.5008173Z remote: Compressing objects:  63% (69/108)        
2025-04-23T06:09:05.5009601Z remote: Compressing objects:  64% (70/108)        
2025-04-23T06:09:05.5010968Z remote: Compressing objects:  65% (71/108)        

2025-04-23T06:09:05.5012321Z remote: Compressing objects:  66% (72/108)        
2025-04-23T06:09:05.5013694Z remote: Compressing objects:  67% (73/108)        

2025-04-23T06:09:05.5015174Z remote: Compressing objects:  68% (74/108)        
2025-04-23T06:09:05.5016544Z remote: Compressing objects:  69% (75/108)        
2025-04-23T06:09:05.5017904Z remote: Compressing objects:  70% (76/108)        
2025-04-23T06:09:05.5019274Z remote: Compressing objects:  71% (77/108)        
2025-04-23T06:09:05.5020682Z remote: Compressing objects:  72% (78/108)        
2025-04-23T06:09:05.5022737Z remote: Compressing objects:  73% (79/108)        

2025-04-23T06:09:05.5025108Z remote: Compressing objects:  74% (80/108)        
2025-04-23T06:09:05.5027137Z remote: Compressing objects:  75% (81/108)        
2025-04-23T06:09:05.5028983Z remote: Compressing objects:  76% (83/108)        
2025-04-23T06:09:05.5030828Z remote: Compressing objects:  77% (84/108)        

2025-04-23T06:09:05.5032882Z remote: Compressing objects:  78% (85/108)        
2025-04-23T06:09:05.5035181Z remote: Compressing objects:  79% (86/108)        

2025-04-23T06:09:05.5037477Z remote: Compressing objects:  80% (87/108)        
2025-04-23T06:09:05.5039730Z remote: Compressing objects:  81% (88/108)        
2025-04-23T06:09:05.5041655Z remote: Compressing objects:  82% (89/108)        
2025-04-23T06:09:05.5043060Z remote: Compressing objects:  83% (90/108)        

2025-04-23T06:09:05.5044618Z remote: Compressing objects:  84% (91/108)        
2025-04-23T06:09:05.5046263Z remote: Compressing objects:  85% (92/108)        

2025-04-23T06:09:05.5047627Z remote: Compressing objects:  86% (93/108)        
2025-04-23T06:09:05.5048943Z remote: Compressing objects:  87% (94/108)        

2025-04-23T06:09:05.5050277Z remote: Compressing objects:  88% (96/108)        
2025-04-23T06:09:05.5051623Z remote: Compressing objects:  89% (97/108)        

2025-04-23T06:09:05.5052945Z remote: Compressing objects:  90% (98/108)        
2025-04-23T06:09:05.5054275Z remote: Compressing objects:  91% (99/108)        

2025-04-23T06:09:05.5055828Z remote: Compressing objects:  92% (100/108)        
2025-04-23T06:09:05.5057166Z remote: Compressing objects:  93% (101/108)        
2025-04-23T06:09:05.5058812Z remote: Compressing objects:  94% (102/108)        
2025-04-23T06:09:05.5060163Z remote: Compressing objects:  95% (103/108)        
2025-04-23T06:09:05.5061498Z remote: Compressing objects:  96% (104/108)        
2025-04-23T06:09:05.5062868Z remote: Compressing objects:  97% (105/108)        
2025-04-23T06:09:05.5064234Z remote: Compressing objects:  98% (106/108)        
2025-04-23T06:09:05.5065785Z remote: Compressing objects:  99% (107/108)        

2025-04-23T06:09:05.5067180Z remote: Compressing objects: 100% (108/108)        
2025-04-23T06:09:05.5068626Z remote: Compressing objects: 100% (108/108), done.        
2025-04-23T06:09:05.5209251Z Receiving objects:   0% (1/127)
2025-04-23T06:09:05.5210841Z Receiving objects:   1% (2/127)
2025-04-23T06:09:05.5212385Z Receiving objects:   2% (3/127)
2025-04-23T06:09:05.5213896Z Receiving objects:   3% (4/127)
2025-04-23T06:09:05.5215822Z Receiving objects:   4% (6/127)
2025-04-23T06:09:05.5217403Z Receiving objects:   5% (7/127)
2025-04-23T06:09:05.5218960Z Receiving objects:   6% (8/127)
2025-04-23T06:09:05.5220596Z Receiving objects:   7% (9/127)
2025-04-23T06:09:05.5222156Z Receiving objects:   8% (11/127)
2025-04-23T06:09:05.5223713Z Receiving objects:   9% (12/127)
2025-04-23T06:09:05.5225471Z Receiving objects:  10% (13/127)
2025-04-23T06:09:05.5227041Z Receiving objects:  11% (14/127)
2025-04-23T06:09:05.5228585Z Receiving objects:  12% (16/127)
2025-04-23T06:09:05.5230141Z Receiving objects:  13% (17/127)
2025-04-23T06:09:05.5231686Z Receiving objects:  14% (18/127)

2025-04-23T06:09:05.5233234Z Receiving objects:  15% (20/127)
2025-04-23T06:09:05.5234793Z Receiving objects:  16% (21/127)
2025-04-23T06:09:05.5236566Z Receiving objects:  17% (22/127)
2025-04-23T06:09:05.5331081Z Receiving objects:  18% (23/127)
2025-04-23T06:09:05.5332658Z Receiving objects:  19% (25/127)
2025-04-23T06:09:05.5334209Z Receiving objects:  20% (26/127)
2025-04-23T06:09:05.5335981Z Receiving objects:  21% (27/127)
2025-04-23T06:09:05.5337495Z Receiving objects:  22% (28/127)

2025-04-23T06:09:05.5339000Z Receiving objects:  23% (30/127)
2025-04-23T06:09:05.5340486Z Receiving objects:  24% (31/127)
2025-04-23T06:09:05.5341969Z Receiving objects:  25% (32/127)
2025-04-23T06:09:05.5343509Z Receiving objects:  26% (34/127)
2025-04-23T06:09:05.5345151Z Receiving objects:  27% (35/127)
2025-04-23T06:09:05.5346738Z Receiving objects:  28% (36/127)
2025-04-23T06:09:05.5348173Z Receiving objects:  29% (37/127)
2025-04-23T06:09:05.5480139Z Receiving objects:  30% (39/127)

2025-04-23T06:09:05.5483335Z remote: Total 127 (delta 7), reused 113 (delta 5), pack-reused 0 (from 0)        
2025-04-23T06:09:05.5486868Z Receiving objects:  31% (40/127)
2025-04-23T06:09:05.5488713Z Receiving objects:  32% (41/127)
2025-04-23T06:09:05.5490541Z Receiving objects:  33% (42/127)
2025-04-23T06:09:05.5492247Z Receiving objects:  34% (44/127)
2025-04-23T06:09:05.5494003Z Receiving objects:  35% (45/127)
2025-04-23T06:09:05.5495928Z Receiving objects:  36% (46/127)
2025-04-23T06:09:05.5497620Z Receiving objects:  37% (47/127)
2025-04-23T06:09:05.5499325Z Receiving objects:  38% (49/127)
2025-04-23T06:09:05.5501027Z Receiving objects:  39% (50/127)
2025-04-23T06:09:05.5502716Z Receiving objects:  40% (51/127)
2025-04-23T06:09:05.5504653Z Receiving objects:  41% (53/127)

2025-04-23T06:09:05.5506602Z Receiving objects:  42% (54/127)
2025-04-23T06:09:05.5508291Z Receiving objects:  43% (55/127)
2025-04-23T06:09:05.5509978Z Receiving objects:  44% (56/127)
2025-04-23T06:09:05.5511674Z Receiving objects:  45% (58/127)
2025-04-23T06:09:05.5513348Z Receiving objects:  46% (59/127)
2025-04-23T06:09:05.5515296Z Receiving objects:  47% (60/127)
2025-04-23T06:09:05.5517017Z Receiving objects:  48% (61/127)
2025-04-23T06:09:05.5518717Z Receiving objects:  49% (63/127)

2025-04-23T06:09:05.5520429Z Receiving objects:  50% (64/127)
2025-04-23T06:09:05.5522133Z Receiving objects:  51% (65/127)
2025-04-23T06:09:05.5523915Z Receiving objects:  52% (67/127)
2025-04-23T06:09:05.5525830Z Receiving objects:  53% (68/127)
2025-04-23T06:09:05.5527525Z Receiving objects:  54% (69/127)
2025-04-23T06:09:05.5529222Z Receiving objects:  55% (70/127)
2025-04-23T06:09:05.5530912Z Receiving objects:  56% (72/127)
2025-04-23T06:09:05.5532627Z Receiving objects:  57% (73/127)

2025-04-23T06:09:05.5534310Z Receiving objects:  58% (74/127)
2025-04-23T06:09:05.5536250Z Receiving objects:  59% (75/127)
2025-04-23T06:09:05.5537975Z Receiving objects:  60% (77/127)
2025-04-23T06:09:05.5539337Z Receiving objects:  61% (78/127)
2025-04-23T06:09:05.5540395Z Receiving objects:  62% (79/127)
2025-04-23T06:09:05.5541429Z Receiving objects:  63% (81/127)
2025-04-23T06:09:05.5542454Z Receiving objects:  64% (82/127)
2025-04-23T06:09:05.5543488Z Receiving objects:  65% (83/127)

2025-04-23T06:09:05.5545319Z Receiving objects:  66% (84/127)
2025-04-23T06:09:05.5547083Z Receiving objects:  67% (86/127)
2025-04-23T06:09:05.5572207Z Receiving objects:  68% (87/127)
2025-04-23T06:09:05.5573973Z Receiving objects:  69% (88/127)
2025-04-23T06:09:05.5575327Z Receiving objects:  70% (89/127)
2025-04-23T06:09:05.5576457Z Receiving objects:  71% (91/127)
2025-04-23T06:09:05.5578101Z Receiving objects:  72% (92/127)
2025-04-23T06:09:05.5579724Z Receiving objects:  73% (93/127)

2025-04-23T06:09:05.5581465Z Receiving objects:  74% (94/127)
2025-04-23T06:09:05.5582898Z Receiving objects:  75% (96/127)
2025-04-23T06:09:05.5584009Z Receiving objects:  76% (97/127)
2025-04-23T06:09:05.5585392Z Receiving objects:  77% (98/127)
2025-04-23T06:09:05.5586868Z Receiving objects:  78% (100/127)
2025-04-23T06:09:05.5588473Z Receiving objects:  79% (101/127)

2025-04-23T06:09:05.5589557Z Receiving objects:  80% (102/127)
2025-04-23T06:09:05.5590607Z Receiving objects:  81% (103/127)
2025-04-23T06:09:05.5591966Z Receiving objects:  82% (105/127)
2025-04-23T06:09:05.5593476Z Receiving objects:  83% (106/127)

2025-04-23T06:09:05.5595341Z Receiving objects:  84% (107/127)
2025-04-23T06:09:05.5596527Z Receiving objects:  85% (108/127)
2025-04-23T06:09:05.5597731Z Receiving objects:  86% (110/127)
2025-04-23T06:09:05.5599711Z Receiving objects:  87% (111/127)

2025-04-23T06:09:05.5601600Z Receiving objects:  88% (112/127)
2025-04-23T06:09:05.5603272Z Receiving objects:  89% (114/127)
2025-04-23T06:09:05.5605422Z Receiving objects:  90% (115/127)
2025-04-23T06:09:05.5607182Z Receiving objects:  91% (116/127)
2025-04-23T06:09:05.5608799Z Receiving objects:  92% (117/127)
2025-04-23T06:09:05.5610393Z Receiving objects:  93% (119/127)
2025-04-23T06:09:05.5612223Z Receiving objects:  94% (120/127)
2025-04-23T06:09:05.5613951Z Receiving objects:  95% (121/127)

2025-04-23T06:09:05.5615960Z Receiving objects:  96% (122/127)
2025-04-23T06:09:05.5617607Z Receiving objects:  97% (124/127)
2025-04-23T06:09:05.5619375Z Receiving objects:  98% (125/127)
2025-04-23T06:09:05.5621093Z Receiving objects:  99% (126/127)

2025-04-23T06:09:05.5622819Z Receiving objects: 100% (127/127)
2025-04-23T06:09:05.5625093Z Receiving objects: 100% (127/127), 157.75 KiB | 2.72 MiB/s, done.
2025-04-23T06:09:05.5627485Z Resolving deltas:   0% (0/7)
2025-04-23T06:09:05.5630182Z Resolving deltas:  14% (1/7)
2025-04-23T06:09:05.5631512Z Resolving deltas:  28% (2/7)

2025-04-23T06:09:05.5632520Z Resolving deltas:  42% (3/7)
2025-04-23T06:09:05.5634415Z Resolving deltas:  57% (4/7)
2025-04-23T06:09:05.5636330Z Resolving deltas:  71% (5/7)
2025-04-23T06:09:05.5637942Z Resolving deltas:  85% (6/7)
2025-04-23T06:09:05.5639502Z Resolving deltas: 100% (7/7)
2025-04-23T06:09:05.5641394Z Resolving deltas: 100% (7/7), done.
2025-04-23T06:09:05.5649371Z From https://github.com/gfs-hybrid-services/bjs-proxy

2025-04-23T06:09:05.5654237Z  * [new ref]         06654af8ecacaa815b5096e64355726504132a3e -> origin/main
2025-04-23T06:09:05.5680677Z ##[endgroup]
2025-04-23T06:09:05.5888547Z ##[group]Determining the checkout info
2025-04-23T06:09:05.5892619Z ##[endgroup]
2025-04-23T06:09:05.5895699Z ##[group]Checking out the ref
2025-04-23T06:09:05.5897975Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2025-04-23T06:09:05.5900465Z Switched to a new branch 'main'
2025-04-23T06:09:05.5902362Z branch 'main' set up to track 'origin/main'.
2025-04-23T06:09:05.5905630Z ##[endgroup]
2025-04-23T06:09:05.5910007Z [command]/usr/bin/git log -1 --format='%H'
2025-04-23T06:09:05.5935903Z '06654af8ecacaa815b5096e64355726504132a3e'
2025-04-23T06:09:05.6163710Z ##[group]Run pushd code

2025-04-23T06:09:05.6164675Z [36;1mpushd code[0m
2025-04-23T06:09:05.6165837Z [36;1mnpm audit[0m
2025-04-23T06:09:05.6218745Z shell: /usr/bin/bash -e {0}
2025-04-23T06:09:05.6219714Z ##[endgroup]
2025-04-23T06:09:05.6315625Z ~/work/bjs-proxy/bjs-proxy/code ~/work/bjs-proxy/bjs-proxy
2025-04-23T06:09:06.8605135Z found 0 vulnerabilities
2025-04-23T06:09:06.8805278Z Post job cleanup.
2025-04-23T06:09:06.9729202Z [command]/usr/bin/git version
2025-04-23T06:09:06.9781397Z git version 2.49.0
2025-04-23T06:09:06.9831583Z Temporarily overriding HOME='/home/runner/work/_temp/6d5426fe-cda3-4a08-8dca-58da3cb668d7' before making global git config changes
2025-04-23T06:09:06.9846867Z Adding repository directory to the temporary git global config as a safe directory
2025-04-23T06:09:06.9850487Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/bjs-proxy/bjs-proxy

2025-04-23T06:09:06.9892295Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-04-23T06:09:06.9946045Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-04-23T06:09:07.0301946Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-04-23T06:09:07.0335163Z http.https://github.com/.extraheader
2025-04-23T06:09:07.0354822Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-04-23T06:09:07.0412664Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-04-23T06:09:07.0977846Z Cleaning up orphan processes`;

/* goals:
 we probably want the following type:

 type JobLog = {
   jobName: string // get this by fuzzy-matching with the response from the jobs api
   rawName: string // just in case we can't fuzzy-match
   children: Array<{ / this gives us the expandable to get rid of the cloning 1 through 99% mess
	 log: string
	 children: Array<{
	   log: string,
	   lineNo: number // todo: we might want to compute this after parsing
	 }>
   }>
 }

 type WorkflowLog = JobLog[]

 */

function parseWorkflowLogs(logfile) {
	const logs = logfile.split("\n");

	const workflowLogs = [{ jobName: "Setup", rawName: "setup", children: [] }];
	for (let i = 0; i < logs.length; i++) {
		let rawLog = logs[i];
		// first, we handle the topmost grouping
		let [datestamp, ...rest] = rawLog.split(" ");
		let curLog = rest.join(" ");

		if (curLog.startsWith("##[group]Run ")) {
			// add something new to workflowLogs
			const tempJobName = curLog.replace("##[group]Run ", "");
			workflowLogs.push({
				jobName: tempJobName,
				rawName: curLog,
				children: [],
			});
		} else {
			// otherwise, it's a child
			const curParent = {
				log: curLog.replace('##[group]', '').trim(),
				children: [],
			};
			workflowLogs[workflowLogs.length - 1].children.push(curParent); // i is a placeholder
			if (curLog.startsWith("##[group]")) {
				// we enter a nested group - the next endgroup will close this
				// if there's an endgroup for the parent run, it will be afterwards
				// start expanding our window...
				do {
					i += 1;
					rawLog = logs[i];
					[datestamp, ...rest] = rawLog.split(" ");
					curLog = rest.join(" ");
					if (!curLog.startsWith('##[endgroup]')) {
						curParent.children.push(curLog);
					}
				} while (!curLog.startsWith("##[endgroup]"));
			}
		}
	}

	return workflowLogs;
}

console.log(JSON.stringify(parseWorkflowLogs(fullLog), null, 2))
//parseWorkflowLogs(fullLog);
